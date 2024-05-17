import { ActivatedRouteSnapshot, CanActivateFn , Router, RouterStateSnapshot } from '@angular/router';
import { HandleTokenService } from './services/Handle_Token/handle-token.service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
 let token = new HandleTokenService()
 let router = new Router()
 if(token.isAuthenticated()){
   return true;
 }
 router.navigate(['login'],{queryParams:{returnUrl:state.url}})
 return false;
};
