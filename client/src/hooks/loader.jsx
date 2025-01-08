import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const useLoader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#2b6fc2");

    const CSSProperties = {
        display: "block",
        margin: "0 auto",
    };
    const Loader = ({ size }) => {
        return (
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={CSSProperties}
                size={size ?? 40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
    }
    return { Loader, loading, setLoading, setColor }
}

export default useLoader;