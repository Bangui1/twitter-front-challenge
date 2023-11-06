import {useEffect, useRef} from "react";

interface UseOutsideAlerterProps {
    onOutsideClick: () => void;
}

export const useOutsideAlerter = ({ onOutsideClick }: UseOutsideAlerterProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return ref;
};
