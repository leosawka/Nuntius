import { useEffect } from 'react';
export function useUnsavedChangesWarning(shouldWarn) {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!shouldWarn)
                return;
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [shouldWarn]);
}
