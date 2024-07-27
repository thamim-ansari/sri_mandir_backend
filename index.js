const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbPath = path.join(__dirname, "srimandir.db");

const app = express();
app.use(cors());
app.use(express.json());

let db = null;
const port = 3001;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/pujalist/", async (request, response) => {
  const getPujaQuery = `SELECT
      *
   FROM puja
    ;`;
  const pujaArray = await db.all(getPujaQuery);
  response.send(pujaArray);
});

app.get("/pujadetails/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const getPujaDetailsQuery = `SELECT * FROM puja WHERE id = ${id}`;
    const getPujaDetailsArray = await db.all(getPujaDetailsQuery);

    if (getPujaDetailsArray.length === 0) {
      return response.status(404).json({ error: "Puja details not found" });
    }

    const pujaDetails = getPujaDetailsArray[0];

    const getCarouselImagesQuery = `SELECT * FROM puja_carousel_image WHERE puja_id = ${id}`;
    const getCarouselImagesArray = await db.all(getCarouselImagesQuery);

    const carouselImageUrls = getCarouselImagesArray.map((image) => {
      return { id: image.id, carouselImageUrl: image.carouselImageUrl };
    });

    const getPujaBenefitsQuery = `SELECT * FROM puja_benefits WHERE puja_id = ${id}`;
    const getPujaBenefitsArray = await db.all(getPujaBenefitsQuery);

    const pujaBenefitsList = getPujaBenefitsArray.map((benefits) => {
      return {
        id: benefits.id,
        benefitsImage: benefits.benefitsImage,
        benefitsHeading: benefits.benefitsHeading,
        benefitsDescription: benefits.benefitsDescription,
      };
    });

    const getPujaProcessQuery = `SELECT * FROM puja_process WHERE puja_id = ${id}`;
    const getPujaProcessArray = await db.all(getPujaProcessQuery);

    const pujaProcessList = getPujaProcessArray.map((puja_process) => {
      return {
        id: puja_process.id,
        pujaId: puja_process.puja_id,
        pujaProcessHeading: puja_process.puja_process_heading,
        pujaProcessDescription: puja_process.puja_process_description,
      };
    });

    const responseData = {
      id: pujaDetails.id,
      card_image_url: pujaDetails.card_image_url,
      event_name: pujaDetails.event_name,
      event_heading: pujaDetails.event_heading,
      event_tagline: pujaDetails.event_tagline,
      temple_name: pujaDetails.temple_name,
      temple_located_city: pujaDetails.temple_located_city,
      temple_located_district: pujaDetails.temple_located_district,
      date: pujaDetails.date,
      host_name: pujaDetails.host_name,
      about_puja_heading: pujaDetails.about_puja_heading,
      about_puja_description: pujaDetails.about_puja_description,
      about_temple_description: pujaDetails.about_temple_description,
      temple_image_url: pujaDetails.temple_image_url,
      carousel_image_urls: carouselImageUrls,
      puja_benefits_list: pujaBenefitsList,
      puja_process_List: pujaProcessList,
    };
    response.json(responseData);
  } catch (error) {
    console.error("Error fetching puja details:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

app.get("/puja_carousel_image", async (request, response) => {
  const getPujaDetailsQuery = `SELECT * FROM puja_carousel_image;`;
  const getPujaDetailsArray = await db.all(getPujaDetailsQuery);
  response.send(getPujaDetailsArray);
});

app.get("/puja_benefits", async (request, response) => {
  const getPujaDetailsQuery = `SELECT * FROM puja_benefits;`;
  const getPujaDetailsArray = await db.all(getPujaDetailsQuery);
  response.send(getPujaDetailsArray);
});

app.get("/puja_process", async (request, response) => {
  const getPujaDetailsQuery = `SELECT * FROM puja_process`;
  const getPujaDetailsArray = await db.all(getPujaDetailsQuery);
  response.send(getPujaDetailsArray);
});

app.get("/test/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const getTestDataQuery = `
    SELECT 
    puja.id AS puja_id,
card_image_url,
event_name,
event_heading,
event_tagline,
temple_name,
temple_located_city,
temple_located_district,
date,
host_name,
about_puja_heading,
about_puja_description,
about_temple_description,
temple_image_url,
puja_carousel_image.id AS carousel_image_id,
puja_carousel_image.puja_id AS carousel_image_id_puja_id,
carouselImageUrl,
puja_benefits.id AS puja_benefits_id,
puja_benefits.puja_id AS puja_benefits_puja_id,
benefitsImage,
benefitsHeading,
benefitsDescription,
puja_process.id AS puja_process_id,
puja_process.puja_id AS puja_process_puja_id,
puja_process_heading,
puja_process_description
    FROM 
    puja LEFT JOIN puja_carousel_image 
    ON puja.id = puja_carousel_image.puja_id 
    LEFT JOIN puja_benefits ON puja_carousel_image.puja_id = puja_benefits.puja_id
    LEFT JOIN puja_process ON puja_benefits.puja_id = puja_process.puja_id
   WHERE 
   puja.id = ${id} 
   AND 
   puja_carousel_image.puja_id=${id}
   AND
  puja_benefits.puja_id =${id} 
   AND 
  puja_process.puja_id =${id};`;
    const getTestDataArray = await db.all(getTestDataQuery);
    response.send(getTestDataArray);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
