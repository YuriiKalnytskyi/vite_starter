import { ReactNode, lazy, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

interface IGenerateComponent {
    name: string;
    path: string;
    isLazy: boolean;
}

export const generateComponent = ({ path, name, isLazy }: IGenerateComponent, index: number) => {
    if (isLazy) {
        const Component = lazy(() =>
            import('@/module').then((module: any) => ({ default: module[name] }))
        );
        return <Route key={`${index}_${name}`} path={path} element={<Component />} />;
    } else {
        const [Component, setComponent] = useState<ReactNode | null>(null);

        useEffect(() => {
            import('@/module').then((module: any) => {
                setComponent(() => module[name]);
            });
        }, [name]);

        if (Component) {
            // @ts-ignore
            return <Route key={`${index}_${name}`} path={path} element={<Component />} />;
        }
    }
};
