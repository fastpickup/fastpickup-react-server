import { useEffect, useRef } from "react";

const { kakao } = window;

const useFetchMap = (latitude, longitude) => {
  const container = useRef(null);

  useEffect(() => {
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(latitude, longitude);
      const options = {
        center,
        level: 4,
      };
      const map = new kakao.maps.Map(container.current, options);

      const markerPosition  = new kakao.maps.LatLng(latitude, longitude); 

      const marker = new kakao.maps.Marker({
          position: markerPosition
      });

      marker.setMap(map);
    });
  }, [latitude, longitude]);

  return { container };
};

export default useFetchMap;