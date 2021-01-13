import firebase from "firebase"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const firebaseConfig = {
  apiKey: "AIzaSyByYt8ki2Q3LWd75NFojxqQpZ-tnV_8z5w",
  authDomain: "planning-poker-b8f66.firebaseapp.com",
  projectId: "planning-poker-b8f66",
  storageBucket: "planning-poker-b8f66.appspot.com",
  messagingSenderId: "1013370510327",
  appId: "1:1013370510327:web:b12b10d63bf377144eacf2",
}
const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()

class IndexPage extends React.Component {
  constructor() {
    super()

    this.state = { currentRound: {} }

    db.collection("rounds")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ currentRound: doc.data() })
          console.log(`${doc.id} => `, doc.data())
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>{this.state.docId}</h1>
        Questions is: {this.state.currentRound.question}
        {this.state.currentRound.answers && (
          <div>
            <br />
            <br />
            Answers: {this.state.currentRound.answers.join(", ")}
          </div>
        )}
        <br />
        <br />
        <button>Reveal Answers</button>
        <br />
        <br />
        <input type="text"></input>
        <button>Submit Answer</button>
        {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div> */}
        {/* <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
      </Layout>
    )
  }
}

export default IndexPage
