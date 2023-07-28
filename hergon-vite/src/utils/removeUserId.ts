export function removeUserId(data: any) {
  const dataWithoutUserId = data.filter((item: any) => delete item.userId);

  return dataWithoutUserId;
}