import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { onMessageListener } from "../../firebase";

function Notification() {
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    //requestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      toast.success(
        `${payload?.notification?.title}: ${payload?.notification?.body}`,
        {
          duration: 3000,
          position: "top-center",
        }
      );
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, [notification]);

  return (
    <div>
     <Toaster/>
    </div>
  );
}
export default Notification;
