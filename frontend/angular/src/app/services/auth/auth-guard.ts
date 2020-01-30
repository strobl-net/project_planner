import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { AuthService } from './auth.serivce.ts'

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor (public auth: AuthService, public router: Router) { }
	
	canActivate(): boolean {
		const token = localStorage.getItem('token');
	}
}