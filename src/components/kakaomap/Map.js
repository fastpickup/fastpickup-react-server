import { useState } from "react";
import useFetchMap from "../../hooks/useFetchMap";

const Map = ({x, y}) => {
    const {container} = useFetchMap(y, x)
    return ( 

        <div ref = {container}  className="w-full h-[200px] border border-black">
            

        </div>

     );
}
 
export default Map;