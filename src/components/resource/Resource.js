import React, { useState } from "react";
import NavBar from "../nav/NavBar";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from "classnames";


const Resource = () => {
    const [activeTab, setActiveTab] = useState("1");
    const toggle = tab => {
        activeTab !== tab && setActiveTab(tab)
    }
    return(
        <>
        <NavBar />
        <div>
        <h3>Helpful Resources</h3>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          > <strong> ID Your Medication </strong>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          > <strong> Drug Information for Consumers </strong>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          > <strong> Over the Counter Medication Info </strong>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          > <strong> Proper Medication Disposal </strong>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <Row>
            <Col sm="6">
              <Card body>
                <CardTitle> Drug Identifier </CardTitle>  
                <CardText> Have questions about what your medication looks like? Did you get a different manufacturer? Check to make sure! </CardText>
                    <Button onClick={() => window.open("https://www.drugs.com/imprints.php/", "_blank")} type="button" className="btn btn-info">Identify Your Medication Here</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle> What if I miss a dose of my medication?  </CardTitle>  
                <CardText> Answers to one of the most common questions. Should I take it now? Learn the basics, but always ask your doctor or pharmacist if you have any questions! </CardText>
                    <Button onClick={() => window.open("https://pharmacy.ca.gov/publications/miss_dose.pdf", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle> Latest Information on Drug Approvals and Safety </CardTitle>
                <CardText> Questions about medications just coming to market or other drug-related topics? See patient friendly information regarding drug approvals </CardText>
                <Button onClick={() => window.open("https://www.fda.gov/drugs/resources-you-drugs/drug-information-consumers", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>  Popular Drug Topics and Cost Saving Resources for Medications </CardTitle>
                <CardText> Get trusted and reliable answers to cost savings and various health and wellness questions  </CardText>
                <Button onClick={() => window.open("https://www.bemedwise.org/news-you-can-use-health-drug-safety-updates/", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
          </Row>
        </TabPane> 
      </TabContent>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="3">
        <Row>
            <Col sm="6">
              <Card body>
                <CardTitle> Know Your OTC Meds </CardTitle>
                <CardText> Great downloadable, multilingual information for families regarding how to take OTC medications safely and how to safely give them to your little ones </CardText>
                <Button onClick={() => window.open("https://www.getreliefresponsibly.com/otc-resources/medication-resources", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle> FDA Information Regarding OTC Medication Safety </CardTitle>
                <CardText> Public service announcements and safety information regarding OTC medications  </CardText>
                <Button onClick={() => window.open("https://www.fda.gov/drugs/understanding-over-counter-medicines/educational-resources-understanding-over-counter-medicine", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Proper Disposal of Medications</CardTitle>
                <CardText>Important information regarding proper and safe disposal of medications</CardText>
                <Button onClick={() => window.open("https://www.bemedwise.org/your-medicines-self-care/drug-storage-and-disposal/", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>FDA Info on Proper Disposal of Medications</CardTitle>
                <CardText>Information on National Drug Take Back Day </CardText>
                <Button onClick={() => window.open("https://www.deadiversion.usdoj.gov/drug_disposal/takeback/index.html", "_blank")} type="button" className="btn btn-info">Learn More</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
    </>

    )

}

export default Resource