import { Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RegisterGuard implements CanActivate{
    constructor(
        private router: Router,
        private settigsService: SettingsService,
    ){}
    canActivate(): boolean{
        if(this.settigsService.getSettings().allowRegistration){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
