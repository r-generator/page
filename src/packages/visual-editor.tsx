import React from 'react'
import { Header, LeftSidebar, RightSidebar, EditorArea } from './layouts'
import { Context, initialState } from './stores/context'
import { commonReducer } from './stores/reducer'
import { useLocallyPersistedReducer } from './hooks'
import { CommonState } from './stores/typings'
import { LOCAL_STORE_KEY } from './constants'
import './visual-editor.scss'

export default () => {
  const [state, commonDispatch] = useLocallyPersistedReducer(
    commonReducer,
    initialState,
    LOCAL_STORE_KEY
  )

  return (
    <Context.Provider
      value={{
        ...((state as CommonState) || {}),
        commonDispatch,
      }}
    >
      <div className="visual-editor">
        <div className="main">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <div className="sidebar">
              <LeftSidebar />
            </div>
            <div className="editor-area-scroll">
              <div
                className="editor-area"
                style={{
                  height:
                    (state as CommonState)?.componentList?.length === 0
                      ? '100%'
                      : 'auto',
                }}
              >
                <EditorArea />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <RightSidebar />
        </div>
      </div>
    </Context.Provider>
  )
}
