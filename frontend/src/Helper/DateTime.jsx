export default function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
  
    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return (""+(hours<10?"0"+hours:hours)+":"+(minutes<10?"0"+minutes:minutes) +":"+ (seconds<10?"0"+seconds:seconds));
    // return { h: hours, m: minutes, s: seconds };
  }