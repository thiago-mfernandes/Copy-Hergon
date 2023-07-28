export function removeCompanyId(data: any) {
  const dataWithoutCompanyId = data.filter((item: any) => delete item.companyId);

  return dataWithoutCompanyId;
}