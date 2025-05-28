import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { catchError, from, switchMap, throwError, BehaviorSubject, filter, take } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from '../../Services/Auth/auth.service';

const tokenKey = "user";
let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const loggingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const authService = inject(AuthService);

  let modifiedRequest = request;
  if (isLoggedIn()) {
    modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  }
  return next(modifiedRequest).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(modifiedRequest, next, authService);
      } else {
        return throwError(() => error);
      }
    })
  );


  // if (isLoggedIn()) {
  //   let newRequest = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //   });
  //   return next(newRequest);
  // } else {
  //   return next(request);
  // }
}

function isLoggedIn(): boolean {
  let token = localStorage.getItem(tokenKey);
  return token != null && token.length > 0;
}

function getToken(): string | null {
  if (isLoggedIn()) {
    let user: any = localStorage.getItem(tokenKey);
    let userData = JSON.parse(user);
    return userData.token;
  } else {
    return null;
  }
}


function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return from(authService.refreshToken()).pipe(
      switchMap(newToken => {
        isRefreshing = false;
        if (newToken && newToken.accessToken) {

          let user: any = localStorage.getItem(tokenKey);
          let userData = JSON.parse(user);
          localStorage.setItem(tokenKey, JSON.stringify({ ...userData, token: newToken.accessToken }));

          refreshTokenSubject.next(newToken.accessToken);
          return next(addTokenHeader(request, newToken.accessToken));
        }
        authService.logout();
        return throwError(() => new Error('Unable to refresh token'));
      }),
      catchError(err => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => next(addTokenHeader(request, token!)))
    );
  }
}

function addTokenHeader(request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}