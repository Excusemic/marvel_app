import { useState, useEffect } from "react"
import OverlayLoader from './Components/Common/OverlayLoader'
import Header from "./Components/Common/Header"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from './theme'
import { sendRequest } from './Utils/helpers'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from './Views/Home'
import Comic from './Views/Comic'

function App() {
  const localStorageYears = () => {
    const currentYear = new Date().getFullYear()
    if (localStorage.getItem("years")) {
      return localStorage
        .getItem("years")
        .split(",")
        .map((item) => Number(item))
    }
    return [1950, currentYear]
  }
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '')
  const [response, setResponse] = useState({ data: null, loading: true, error: false })
  const [years, setYears] = useState(localStorageYears())

  useEffect(() => {
    return sendRequest(setResponse, searchTerm, years[0], years[1])
  }, []);
  if (response?.error) {
    return "something went wrong"
  } 
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <OverlayLoader />
        <Switch>
          <Route exact path="/">
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              years={years}
              setYears={setYears}
              sendRequest={sendRequest}
              setResponse={setResponse}
              loading={response?.loading}
            />
            <Home data={response?.data?.data?.data?.results} loading={response?.loading} />
          </Route>
          <Route path="/:id">
            <Comic />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
