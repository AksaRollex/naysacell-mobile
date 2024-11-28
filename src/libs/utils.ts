export function rupiah(value: number | string) {
    if (!value) return 0;
  
    if (typeof value === "string") {
      value = parseInt(value);
    }
  
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }