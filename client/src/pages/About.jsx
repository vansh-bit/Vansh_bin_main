import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AboutPage = () => {
  return (
    <div >
    <div className="m-auto w-2/3 h-auto" >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-black">
          Bin2Bite
        </h1>

        <h1 className=" text-green-700 text-3xl font-bold text-center mb-8">
          Bridging Plates, Breaking Chains
        </h1>
        <div className="">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ fontWeight: 800, color: "#4285F4" }}>
                What is Bin2Bite
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In a world where food wastage coexists with hunger, we've
                embarked on a mission to create a seamless bridge between
                abundance and need. Our platform harnesses the power of
                technology to ensure that no plate goes wasted, and no one goes
                to bed hungry.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: 800, color: "#4285F4" }}>
                Our Vision
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                At Bin2Bite, we've recognized the heartbreaking paradox
                within our society—while vast amounts of food are left uneaten,
                countless individuals struggle with hunger and poverty. We are
                not just a website; we are a movement that seeks to redefine the
                narrative around food wastage and hunger.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: 800, color: "#4285F4" }}>
                Features
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul className="list-disc pl-4">
                  <li className="">
                    <strong>Real-Time Food Locator:</strong> Our live location
                    feature ensures that surplus food is not only identified but
                    can be claimed by those who need it, all in real-time.
                  </li>
                  <li className="">
                    <strong>NGO Collaboration:</strong> We partner with NGOs
                    dedicated to eradicating hunger, facilitating a streamlined
                    process for them to connect with food donors.
                  </li>
                  <li className="">
                    <strong>Community Impact:</strong> Track the positive impact
                    of your contributions through our interactive dashboard. See
                    the number of meals provided, lives touched, and communities
                    strengthened—all in one place.
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: 800, color: "#4285F4" }}>
                How it Works
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Through our user-friendly platform developed with React, we've
                made it easier than ever to make a difference. Donors can simply
                post their live location and details about the surplus food they
                have, ensuring that those in need can easily locate and access
                it. Our website facilitates direct communication between donors
                and NGOs, fostering a sense of community and shared
                responsibility.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: 800, color: "#4285F4" }}>
                Join Us
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Bin2Bite isn't just a platform; it's a call to action.
                Join us in the fight against food wastage and hunger. Be a part
                of a community that believes in making a difference—one meal at
                a time.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* Closing Statement */}
        <section>
          <p className="text-xl text-center my-20">
            Let's bridge plates, break chains, and nourish lives together with
            Bin2Bite.
          </p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;
