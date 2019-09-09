import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = 'login';
    if (req.url.search(re) === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: `token ${localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(req);
    // const auth_req = req.clone({
    //   headers: req.headers.set('Authorization', 'token ' + localStorage.getItem('token'))
    // });
    // return next.handle(auth_req);
  }

}
