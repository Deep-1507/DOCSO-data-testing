const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;


app.use(bodyParser.json());


const mongoUrl = 'mongodb+srv://admin:deep1507@cluster0.rd0szsg.mongodb.net/';
const dbName = 'DOCSO';
const collectionName = 'online_scrapped_data';

app.post("/api/detail", async (req, res) => {
  try {
    // Make a request to the external API
    const response = await axios.post(
      "https://www.justdial.com/api/detail?searchReferer=gen%7Clst",
      req.body,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.6",
          "content-type": "application/json",
          cookie: "ppc=; _ctok=827909bc8acf71724062053706zt4sg4jz4gw3uEFA6qy4ouxmx5ok8p9vxn4z; web_visit=2024-08-19T10:07:33.706Z; jd_www_nxt=1; rfr=gen; ppc=; Continent=AS; AKA_A2=A; ak_bmsc=B23726253410321D7F9F1662A4C41BA2~000000000000000000000000000000~YAAQtY0sMdgufV2RAQAAMEMbahjqfN516x0njBmDhJgpxH9+vTzKRUglLk+zwNUdgB25mgSGAA062XJXfG2fuz3PBixJ2WrW83ber43Bftih1kGeFeAW2fwJSO/4D4IGoIoSGoobvFM5UhPxgZvr7+Lk7pLxmxyr/aDCRr6/eMBtWFS6g2gWMP9wLAvD6XjC4GiqhFQO5L2uMe5PnfFboYLPT5otasUZ7VZriZQIHV9Or/qM6tqiEzf0fQxLi2orgttTkTlgrVOk46n/nK3Don37eCwHhEBVb8dEySsL9aQHrCcF3rt6Sgpgjq+6bG9C0K24cDiYd4nIJQaoy81uPMExphj2FE9V3V3fA17SN2Rkkiq0E7FvJXcPKpqebrbdrMRlwK2JcW2VRKEnHtQqlQYXJNJGWUI+ymTnSHpL8N4Hyl37dU8q5RNGo97WEONeXmKNjW5epYTK+hChRXn2D6Jdh9q0JNW6F2Hhjk+1y2snA6g=; Ak_City=MUMBAI; sarea=; pincode=; TKY=4469078561876fdf05457e96868ddf6088c2f18015c7065fa97040cfbabdd6cf; docidarray=; __glcact=01001010 01000100; lpg=lst; scity=Jhansi; main_city=Jhansi; inweb_city=Jhansi; alat=25.449275970458984; alon=78.56639862060547; _abck=FD03932C2A06C7E825914D46712F0534~0~YAAQ540sMd5a0V6RAQAAKpkzagxaJXr9EIOR7Lg3h3Xd0LFMomLj7YYDPWbWCLgpBTdDhkQizzWTbpdQ8deOAQB5DdeyHk6/Iv/sAKmBcu3UM+C24Z2rWJAjVUxId8XWg1My/jS+IGG2mVARSicw2j3XAaCQT+W9VXToZws397ejtxcIP4m2NK+nErdWxIYu4egyVyGCKCpUkvro9OyKEq05vDJQo07kbAiFTVo+fFKYOYxQpjAn7/GNnPAvR9RPf49l8QFpRjoW+tmT9z2CTU4bIKgFlAHT37/omTfMZYGlwmxMIHJrTU4zubtdfaFurcfpy8c+Rd12whWXZa863uet1/5MSZ60rz+OZ9WRkc7sfGR5225D3ZBY0mM7MRGtWxc8j5odVji1138ySw4aUcUtfE3fv9uHB7Ss2kkak2ZTP+23jopgeDZ282g/J7zUgre8xdHoGaNxT6D3Vu3jic8aPhgPcrTvWljaZsx+2Dbl3EB++Nz7RZkPU9cpFU9FajIrtq7LV7+WAfU+tFKFH2RtmG7IFMDL+CxBgI3Ri1z5uUcQyQ==~-1~-1~1724065656; bm_sz=0C6CC78167FDBC48B0142AD6441FC0BE~YAAQ540sMeBa0V6RAQAAKpkzahjlg/ll/3cQqMENpXFJX+ntI/qrSPBCPL7mqjC4X2Pi8DImN01xx5J9j/dlUzdO4d6o+RiJ6SwcnwieDGZwJQRy1P0dsHCtYYIQ9gghVxpH0Lw7HNVT7rHcDLY2+EA3rnKVBXh1bufxVilpQSVpJ9uCK3Fc/zZnKNyb0yY6Gmqh9x/vOo8xIU8goIE1Xt/Vw8zJhRVQQhqpTiVSVR8PBHKbV9BcJAOo9H/9obDuxtUkIZf0/a2ID/IRoSbhy31RIsGDynd6Ygeix4NYO0mpGSjFFUj14lp25lgUZZJgawE4JqlcHJgJPKo92ooj/GMnhdMzmIMSk+yWs+HGDpETomn7p8E3qkEsW0IiN/7tpaFrth+70mM9STDfwQqKcjRJvaEXgGL/i4heuOG/qYfts5EkAg1EJGbz7sQaMmPfoKlkas5YlPB/OigiZ/sN9r41FEcysxEJQoWrbhG1BX4SzkOGJpxzCljp1C4VgRSh5dR86cEBoXT8gHHNzwUAGslYO5hqsSwWJAFO2NtlIecFF+/hQaQn+wGjgA3or+OM7DWQSktny77H5SS0Kgi2ZQ==~3420216~3224387; _wbssid=web2B92CE9AD8406FF3A283A21214E533E0; bm_sv=A6572548CDBF53C95536F5784CCF7672~YAAQnI0sMZt1bF+RAQAAFs9Mahi2eNpnnZHX64Kn3Zq3FSX3KHumj+gOgojnMcCu5JF3aRZTkmalnZBcwtimKoeoAxHcHbQDptUGyV9EY/PUwOPn8T/koE0h/kfbB7puHMekWScUL0/5koorGbpBq5OYc9XKniOxqvlEiazGLRXRIh9f6lFS9HGFl456g/P+E5ReBqOkPCAS5ZC+T7NYGIPvjrOkolZ/A2bL0s+G/8Wpu09/7ql1EQHyEfy5Vxvcpm6RSQ==~1", 
          origin: "https://www.justdial.com",
          referer: "https://www.justdial.com/some-referer-url",
          requesttime: new Date().toISOString(),
          "sec-ch-ua": '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          securitytoken: "your-security-token",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      }
    );

    // Extract and structure the data
    const data = response.data.results;

    const contactPerson = data.contactperson;
    const name = data.name;
    const email = data.email;
    const YOE = data.YOE;
    const totJdReviews = data.totJdReviews;
    const building = data.building;
    const street = data.street;
    const area = data.area;
    const pincode = data.pincode;
    const VNumber = data.VNumber;
    const city = data.city;
    const qualification = data.qualification;
    const award_certificate = data.award_certificate;
    const catalog_slider = data.catalog_slider;
    const addressln = data.addressln;
    const Reviews = data.Reviews;
    const categories = data.AlsoListedIn.map(item => item.category);
    
    const Data_Array = {
        contactPerson,
        name,
        email,
        YOE,
        totJdReviews,
        building,
        street,
        area,
        pincode,
        VNumber,
        city,
        qualification,
        award_certificate,
        catalog_slider,
        addressln,
        Reviews,
        categories
    };

    // Connect to MongoDB and insert the data
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(Data_Array);
    await client.close();

    // Send the response back to the client
    res.json(Data_Array);

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
