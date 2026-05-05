import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Loginservice } from './loginservice';

export function RoleGuard(requiredRole: 'ADMIN' | 'VENDEUR' | 'ACHETEUR'): CanMatchFn {
  return () => {
    const auth = inject(Loginservice);
    const router = inject(Router);

    return auth.me().pipe(
      switchMap((res: any) => {
        // ✅ bon rôle => ok
        if (res?.role === requiredRole) return of(true);

        // ❌ mauvais rôle => logout + redirect login
        return auth.logout().pipe(
          map(() => {
            router.navigateByUrl('');
            return false;
          }),
          catchError(() => {
            router.navigateByUrl('');
            return of(false);
          })
        );
      }),
      // pas connecté / erreur => redirect login
      catchError(() => {
        router.navigateByUrl('');
        return of(false);
      })
    );
  };
}
