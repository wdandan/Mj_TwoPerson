/**
 * 场景管理类(全局唯一管理场景的地方)控制游戏场景流程的切换 不用枚举来创建场景，避免过多依赖
 * @author lucywang
 * @date 2017/10/19
 */
module JAY {
    export class SceneManager extends Single {

        private _runningScene: JAY.Scene = null;
        private _scenesStack: Array<JAY.Scene> = [];
        private _nextScene: JAY.Scene = null;
        private _sendCleanupToScene: boolean;

        //为方便提示，加入此接口
        public static get Instance(): SceneManager {
            return this.getInstance();
        }

        private _setNextScene() {
            egret.MainContext.instance.stage.addChild(this._nextScene);

            if (this._runningScene) {
                this._runningScene.onExitTransitionDidStart();
            }

            this._nextScene.onEnterTransitionDidFinish();

            if (this._sendCleanupToScene && this._runningScene) {
                this._runningScene.parent.removeChild(this._runningScene);
            }

            this._runningScene = this._nextScene;
            this._nextScene = null;
        }

        //启动游戏，并运行scene场景。本方法在主程序第一次启动主场景的时候调用。如果已有正在运行的场景则不能调用该方法；会调用pushScene-->startAnimation。
        public runWithScene(scene: JAY.Scene) {
            console.assert(scene != null, "This command can only be used to start the SceneManager. There is already a scene present.");
            console.assert(this._runningScene == null, "_runningScene should be null");

            this.pushScene(scene);
        }

        //直接使用传入的scene替换当前场景来切换画面，当前场景被释放。这是切换场景时最常用的方法。
        public replaceScene(scene: JAY.Scene) {
            console.assert(scene != null, "the scene should not be null");
            if (this._runningScene == null) {
                this.runWithScene(scene);
                return;
            }

            if (scene == this._nextScene)
                return;

            if (this._nextScene) {
                if (this._nextScene.isRunning) {
                    this._nextScene.parent.removeChild(this._nextScene);
                }  
                
                this._nextScene = null;
            }

            this._sendCleanupToScene = true;

            let len = this._scenesStack.length;
            this._scenesStack.splice(len - 1, 1, scene);

            this._nextScene = scene;
            this._setNextScene();
        }

        //将当前运行中的场景暂停并压入到代码执行场景栈中，再将传入的scene设置为当前运行场景，只有存在正在运行的场景时才调用该方法；
        public pushScene(scene: JAY.Scene) {
            console.assert(scene != null, "the scene should not null");
            this._sendCleanupToScene = false;
            this._scenesStack.push(scene);
            this._nextScene = scene;
            this._setNextScene();
        }

        //释放当前场景，再从代码执行场景中弹出栈顶的场景，并将其设置为当前运行场景。如果栈为空，直接结束应用。和PushScene结对使用
        public popScene() {
            console.assert(this._runningScene != null, "running scene should not null");
            this._scenesStack.pop();
            let len = this._scenesStack.length;
            if (len == 0) {
                //结束程序
            } else {
                this._sendCleanupToScene = true;
                this._nextScene = this._scenesStack[len - 1];
                this._setNextScene();
            }
        }

        public get runningScene() {
            return this._runningScene;
        }

        //end() 释放和终止执行场景，同时退出应用
        public end() {

        }

        // 暂停当前运行场景中的所有计时器和动作，场景仍然会显示在屏幕上
        public pause() {

        }

        //恢复当前运行场景的所有计时器和动作，场景仍然会显示在屏幕上
        public resume() {

        }
    }
}