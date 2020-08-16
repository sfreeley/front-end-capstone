import React, { useState, useEffect } from "react";
import NavBar from "../nav/NavBar";
import { Label, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, Button, CardTitle, CardText, Row, Col, Input } from 'reactstrap';
import classnames from "classnames";
import ApplicationManager from "../modules/ApplicationManager";
import "./styles/Resource.css"

const Resource = (props) => {

  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    activeTab !== tab && setActiveTab(tab)
  }
  const [categories, setCategories] = useState([])
  const [topics, setTopics] = useState([])
  const [resources, setResources] = useState([])
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllTopics = () => {
    ApplicationManager.getTopics().then(topicsFromAPI => setTopics(topicsFromAPI))
  }

  const getTopicsAndResources = () => {
    ApplicationManager.getTopicsWithResources().then(apiResult => setResources(apiResult))
  }


  const getCategoryValues = () => {
    ApplicationManager.getCategories().then(categories => {
      setCategories(categories.Result.Items.Item)
    })
    setIsLoading(true)
  }

  const getResults = (event) => {

    let target = event.target.value
    ApplicationManager.getCategorySelectionResults(target).then(response => {
      setResults(response.Result.Resources.Resource)
    })

  }

  useEffect(() => {
    getCategoryValues();
    getAllTopics();
    getTopicsAndResources();
    setIsLoading(false)
  }, [])

  return (
    <>
      <NavBar {...props} />

      <h3>Helpful Resources</h3>
      <div className="div-resourceSelector">
        <div className="label-healthTopics">
          <Label>Select any health topic from the dropdown</Label>
        </div>
        <span className="div-dropdown-selector--container">
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
        </span>

        <div className="health-link-container"> {results.map(result => {
          return <div className="p-3 my-2 rounded bg-docs-transparent-grid div-health-link">

            <Row>
              <Col>
                <Card className="health-link">
                  <CardTitle className="info-icon">
                    <img src="https://img.icons8.com/metro/26/000000/info.png" alt="info-icon" />
                  </CardTitle>
                  <CardBody>
                    <a className="cardBody-link" rel="noopener noreferrer" target="_blank" href={result.AccessibleVersion}>{result.Title}</a>
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </div>

        })

        }
        </div>
        <Nav tabs className="tab-idMed">
          <NavItem>
            {topics.map(topic => {
              return (
                <>
                  <NavLink
                    role="button"
                    className={classnames({ active: activeTab === topic.id })}
                    onClick={() => { toggle(topic.id); }}>
                    <strong> {topic.topic} </strong>
                  </NavLink>

                  {resources.map(resource => {
                    return (
                      topic.id !== resource.topicId ? null :
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={topic.id}>
                            <Card body className="informationCard">
                              <CardTitle>{resource.title} <img src="https://img.icons8.com/metro/26/000000/info.png" alt="info-icon" /> </CardTitle>
                              <CardText> {resource.description} </CardText>
                              <Button onClick={() => window.open(resource.url, "_blank")} type="button" className="btn btn-info">Learn More</Button>
                            </Card>
                          </TabPane>
                        </TabContent>
                        )
                      })
                    }
                </>
              )
            })
          }
          </NavItem>
        </Nav>
      </div>
    </>

  )

}

export default Resource
