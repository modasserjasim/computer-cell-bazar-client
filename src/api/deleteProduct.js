import Swal from 'sweetalert2'

export const deleteProduct = product => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${process.env.REACT_APP_API_URL}/my-product/${product._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${localStorage.getItem('computerBazar-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Product has been deleted!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                })

        }
    })
}