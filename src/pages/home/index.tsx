import React, {Component} from 'react'
import styles from './style.module.scss'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>这是首页</h1>
        <div className={styles.homecontent}>
          8888
        </div>
      </div>
    )
  }
}