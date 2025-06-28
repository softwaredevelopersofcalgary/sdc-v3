import { PrismaClient } from "@prisma/client";
import { data as tech_list } from "../src/helpers/tech.data";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < tech_list.length; i++) {
    const new_tech = tech_list[i];

    const existingRecord = await prisma.masterTech.findFirst({
      where: { slug: new_tech ? new_tech.slug : "" },
    });

    if (!existingRecord) {
      const add_tech = await prisma.masterTech.create({
        data: {
          slug: new_tech ? new_tech.slug : "",
          label: new_tech ? new_tech.label : "",
          imgUrl: new_tech ? new_tech.imgUrl : "",
        },
      });
    }
  }

  // Alternative approach - check if exists first
  const existingChapter = await prisma.chapter.findFirst({
    where: { name: "Calgary" },
  });

  if (!existingChapter) {
    await prisma.chapter.create({
      data: {
        name: "Calgary",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
