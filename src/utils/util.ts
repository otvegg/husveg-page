export const getDateString = () => {
  const transform = (timeUnit: number) => {
    return timeUnit.toString().length > 1 ? timeUnit : '0' + (timeUnit + 1);
  };

  const date = new Date();
  const month = transform(date.getMonth() + 1);
  const day = transform(date.getDate());
  const minutes = transform(date.getMinutes());
  const hours = transform(date.getHours());
  const dateString = date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
  return dateString;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
