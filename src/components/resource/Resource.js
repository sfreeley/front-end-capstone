import React, { useState, useEffect } from "react";
import NavBar from "../nav/NavBar";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Toast, ToastHeader, ToastBody, Input } from 'reactstrap';
import classnames from "classnames";
import ApplicationManager from "../modules/ApplicationManager";
import "./styles/Resource.css"



const Resource = (props) => {
 
    const [activeTab, setActiveTab] = useState("1");
    const toggle = tab => {
        activeTab !== tab && setActiveTab(tab)
    }
    const [categories, setCategories] = useState([])
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCategoryValues = () => {
      ApplicationManager.getCategories().then(categories => {
        setCategories(categories.Result.Items.Item)
      })
      setIsLoading(true)
    }

    const getResults = (event) => {
     
     let target = event.target.value
      ApplicationManager.getCategorySelectionResults(target).then(response => {
        console.log(response.Result.Resources.Resource, "result")
        setResults(response.Result.Resources.Resource)
      })
    
       
    }

    useEffect(() => {
      getCategoryValues();
    },[])

    // useEffect(() => {
    //   if(isLoading) getResults();
    // },[isLoading])

  
   

    // useEffect(() => {
    //   getCategoryValues()
    //   .then(categoriesFromAPI => {
        
     
    //     getResults()
    //     .then(resultsFromAPI => {
          
    //     setCategories(categoriesFromAPI.Result.Items.Item)
        
    //     setResults(resultsFromAPI.Result.Resources.Resource)
        

    //   }) 
    //   })
    // },[])

    // const handleDropdownChange = (event) => {
      
    //   results.map(result => {
    //     setIsLoading(false)
    //     console.log(result)
    //     setUserChoice(result.RelatedItems.RelatedItem)
    //     console.log(userChoice)
    //   })
        
    // }

    // .then(results.map(result => {
    //   console.log(result)
    //     setUserChoice(result.AcccessibleVersion)
    // }))

 
    return(
        <>
        <NavBar {...props} />
        <h3>Helpful Resources</h3>
        <div className="div-resourceSelector">
        <Input
          type="select"
          className="dropdown-selector"
          id="categories"
          name="categories"
          onChange={getResults}>
          
            {categories.map(category => {
              return <option key={category.Id} value={category.Id}>{category.Title}</option>
            })}
          </Input>
        <div className="health-link-container"> {results.map(result => {
          return  <div className="p-3 my-2 rounded bg-docs-transparent-grid">
        <Toast className="health-link">
          <ToastHeader>  
          </ToastHeader>
          <ToastBody >
            <a rel="noopener noreferrer" target="_blank" href={result.AccessibleVersion}>{result.Title}</a>
          </ToastBody>
        </Toast>
      </div>
           
          })
          
        }
        </div>
      <Nav tabs className="tab-idMed">
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}> <strong> ID Your Medication </strong>
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





 //   const [resources, setResources] = useState([])
  //   console.log(resources)
  //   const getResources = () => {
  //     ApplicationManager.getAllResources().then(resources => {
  //         setResources(resources)
  //     })
  // }
  
  // useEffect(() => {
  //     getResources();
  // },[]);
