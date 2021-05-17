import React, { Component } from 'react'
import Board from 'react-trello'
import _ from 'lodash'
class BoardTrello extends Component {
    state = {
        dataStart: [],
        dataDoing: [],
        dataComplete: [],
        dataExprired: [],
        dataLose: [],
    }

    setEventBus = (eventBus) => {
        this.setState({ eventBus })
    }

    shouldReceiveNewData = (nextData) => {
        // console.log('New card has been added')
        // console.log(nextData)
    }

    handleCardAdd = (card, laneId) => {
        // console.log(`New card added to lane ${laneId}`)
        // console.dir(card)
    }

    render() {
        const {data} = this.props
        const dataStart = []
        const dataDoing = []
        const dataComplete = []
        const dataExprired = []
        const dataLose = []
        if (data) {
            // data Start
            data.map((element, index) => {
                if (element.status == "start") {
                    dataStart.push({
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
            // data Doing
            data.map((element, index) => {
                if (element.status == "doing") {
                    dataDoing.push({
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
            // data Exprired
            data.map((element, index) => {
                if (element.status == "exprired") {
                    dataExprired.push({
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
            // data Complete
            data.map((element, index) => {
                if (element.status == "complete") {
                    dataComplete.push({
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
            // data Lose
            data.map((element, index) => {
                if (element.status == "lose") {
                    dataLose.push({
                        id: element.id,
                        title: element.name,
                        description: element.subject,
                        data: element
                    })
                }
            })
        }
        const board = {
            lanes: [
                {
                    id: "start",
                    title: "Start",
                    // label: '2/2',
                    cards: dataStart
                },
                {
                    id: "doing",
                    title: 'Doing',
                    // label: '2/2',
                    cards: dataDoing
                },
                {
                    id: "exprired",
                    title: 'Exprired',
                    // label: '2/2',
                    cards: dataExprired
                },
                {
                    id: "complete",
                    title: 'Complete',
                    // label: '2/2',
                    cards: dataComplete
                },
                {
                    id: "lose",
                    title: 'Lose',
                    // label: '2/2',
                    cards: dataLose
                }
            ]
        }
        return (
            <Board
                editable
                // onCardAdd={this.handleCardAdd}
                data={board}
                draggable
                onDataChange={this.shouldReceiveNewData}
                eventBusHandle={this.setEventBus}
                handleDragEnd={(cardId, sourceLaneId, targetLaneId) => {
                    let DataChange = {
                        id: cardId,                      
                        status: targetLaneId
                    }
                    console.log(DataChange)
                }}
                onCardClick={
                    (cardId, metadata, laneId) => {
                        console.log("cardId",cardId)
                        console.log("metadata", metadata)
                        console.log("laneId", laneId)
                    }
                }
                onCardDelete = {
                    (cardId, laneId) => {
                        console.log(cardId)
                    }
                }
            />
        )
    }
}
export default BoardTrello