import { NavigationPath } from '@/models';

export const SIGNATURE_ROUTES = [
    {
        path: NavigationPath.Signature,
        loadComponent: () => import(
            /** webpackChunkName: "signature" */
            "./signature.component"
        ).then(c => c.SignatureComponent)
    }
]
