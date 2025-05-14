import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from './notificationsSlice';

export default function Notifications() {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    notifications.forEach(n => {
      setTimeout(() => {
        dispatch(removeNotification(n.id));
      }, 4000);
    });
  }, [notifications, dispatch]);

  return (
    <div>
      {notifications.map(n => (
        <div key={n.id} className={`notif ${n.type}`}>
          {n.message}
        </div>
      ))}
    </div>
  );
}
