import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const order = await prisma.orders.create({
    data: {
      userId: body.userId,
      stripeId: body.stripeId,
      name: body.name,
      address: body.address,
      zipcode: body.zipcode,
      city: body.city,
      country: body.country,
    },
  })

  body.products.forEach(async (prod: any) => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: Number(prod.id),
      },
    })
  })

  return {
    statusCode: 200,
    order,
    message: 'success',
  }
})