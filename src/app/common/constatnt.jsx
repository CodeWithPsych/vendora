export const Item_per_page=10
export function discountedPrice(item){
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}