export default function (enumObject: any) {
  return Object.keys(enumObject).filter((item) => {
    return isNaN(Number(item));
  });
}
