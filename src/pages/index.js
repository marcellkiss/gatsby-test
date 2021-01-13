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
  currentRoundDocRef = null
  roundsColletionRef = null
  unsubscribeRoundChanges = () => {}

  constructor() {
    super()

    this.state = { currentRound: {} }

    this.roundsColletionRef = db.collection("rounds")

    this.roundsColletionRef
      .orderBy("created", "desc")
      .limit(1)
      .onSnapshot(querySnapshot => {
        console.log({ docs: querySnapshot.docs.map(doc => doc.data()) })
        this.currentRoundDocRef =
          querySnapshot.docs[querySnapshot.docs.length - 1].ref
        this.unsubscribeRoundChanges()
        this.unsubscribeRoundChanges = this.currentRoundDocRef.onSnapshot(
          documentSnapshot => {
            const currentRoundData = documentSnapshot.data()
            console.log({ currentRoundData })
            this.setState({ currentRound: currentRoundData })
          }
        )
      })
  }

  submitEstimation(event) {
    console.log(`IndexPage::submitEstimation`, this.state.estimation)

    const currentRound = { ...this.state.currentRound }
    currentRound.estimations.push(this.state.estimation)

    this.currentRoundDocRef.update(currentRound)
  }

  submitTask(event) {
    console.log(`IndexPage::submitNewTask`, this.state.task)

    this.roundsColletionRef.add({
      estimations: [],
      task: this.state.task,
      visible: false,
      created: new Date(),
    })
  }

  toggleVisibility(event) {
    console.log(`IndexPage::toggleVisibility`, this.state.task)

    const currentRound = { ...this.state.currentRound }
    currentRound.visible = !currentRound.visible

    this.currentRoundDocRef.update(currentRound)
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>{this.state.docId}</h1>
        Task to estimate: <b>{this.state.currentRound.task}</b>
        {this.state.currentRound.visible && (
          <div>
            <br />
            <br />
            Estimations: {this.state.currentRound.estimations.join(", ")}
          </div>
        )}
        <br />
        <br />
        {this.state.currentRound.visible ? (
          <button onClick={this.toggleVisibility.bind(this)}>
            Hide Estimations
          </button>
        ) : (
          <button onClick={this.toggleVisibility.bind(this)}>
            Reveal Estimations
          </button>
        )}
        <br />
        <br />
        <br />
        <br />
        <div>Here you can submit your answer (1, 2, 3, 5, 8, 13, 21, ...)</div>
        <input
          type="text"
          label="1, 2, 3, 5, 8, 13, 21, ..."
          onChange={evt => this.setState({ estimation: evt.target.value })}
        ></input>
        <button onClick={this.submitEstimation.bind(this)}>
          Submit Answer
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          Here you can start a new estimation by defining the name of the task
        </div>
        <input
          type="text"
          palceholder="Name of the task"
          onChange={evt => this.setState({ task: evt.target.value })}
        ></input>
        <button onClick={this.submitTask.bind(this)}>
          New estimation for this task
        </button>
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
