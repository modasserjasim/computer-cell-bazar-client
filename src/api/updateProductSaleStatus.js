export const updateProductSaleStatus = async id => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/my-product/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
        },
        body: JSON.stringify({ status: true })
    })
    const salesStatus = await res.json()
    return salesStatus;
}