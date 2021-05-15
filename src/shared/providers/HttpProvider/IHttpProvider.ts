interface IHttpProvider {
  requestGetByUrl<T>(url:string): Promise<T>
}

export { IHttpProvider }