const { PrismaClient } = require(".prisma/client");

const client = new PrismaClient();

const bookSeat = async (movieName, user) => {
  const availableSeat = await client.seat.findFirst({
    where: {
      movie: movieName,
      claimedBy: null,
    },
  });


  if (!availableSeat) {
    throw new Error(`Oh no! ${movieName} is all booked.`)
  }

  console.log(`Considering seat ${availableSeat.id} v${availableSeat.version} for ${user}`);

  const seats = await client.seat.updateMany({
    data: {
      claimedBy: user,
      version: {
        increment: 1,
      },
    },
    where: {
      id: availableSeat.id,
      version: availableSeat.version, // This version field is the key; only claim seat if in-memory version matches database version, indicating that the field has not been updated
    },
  })
  
  if (seats.count === 0) {
    throw new Error(`That seat is already booked! Please try again.`)
  }

  console.log(`${user} claimed the seat`);
}

(async () => {
  await client.seat.create({
    data: {
      movie: 'test',
    }
  });

  let exceptions = 0;
  const fn = async (user) => {
    try {
      await bookSeat('test', user);
    } catch (err) {
      exceptions++;
    }
  };

  await Promise.all([fn('user1'), fn('user2'), fn('user3'), fn('user4'), fn('user5'), fn('user6')]);

  console.log(`There were ${exceptions} exceptions`);
})();
