export function getDeliveryFee(state: string, count: number) {
  let deliveryFee = 1000;
  const isFree = false;

  if (count === 0) return (deliveryFee = 0);
  if (isFree) return (deliveryFee = 0);
  if (state === "") return (deliveryFee = 0);
  if (state === "Abuja") return (deliveryFee = 100);
  if (state === "Abia") return (deliveryFee = 200);
  if (state === "Adamawa") return (deliveryFee = 300);

  return deliveryFee;
}
