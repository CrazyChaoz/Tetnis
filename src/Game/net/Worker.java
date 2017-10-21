package Game.net;

import Game.Block;
import javafx.application.Platform;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.concurrent.Task;
import javafx.scene.Group;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by testuser on 21.10.2017.
 */
public class Worker {
    public static String userName;
    public static List<String> inputQueue=new ArrayList();
    public static Block curr_this;
    public static Block curr_other;
    public static Group gamescreen=new Group();
    public static IntegerProperty killedLines=new SimpleIntegerProperty(0);

    public static void startServer(){
        Task<Void> server=new Task<Void>() {
            @Override
            protected Void call() throws Exception {
                Platform.runLater(()->{
                    new Server(23456);
                });
                return null;
            }
        };
        new Thread(server).start();
    }

    public static void startClient(){
        Task<Void> client=new Task<Void>() {
            @Override
            protected Void call() throws Exception {
                Platform.runLater(()->{
                    new Client("localhost",23456);
                });
                return null;
            }
        };
        new Thread(client).start();
    }

    public String getLastInputs(){
        StringBuilder sb=new StringBuilder();
        for (String s:inputQueue){
            sb.append(s);
            sb.append(";");
        }

        return sb.toString();
    }

    public static Task<Void> getLocalGame(){
        return new Task<Void>() {
            @Override
            protected Void call() throws Exception {

                Platform.runLater(() -> {
                    curr_this = new Block(true);
                    Block.updateGhostBlock(curr_this, gamescreen);
                    gamescreen.getChildren().addAll(curr_this);
                });

                while (true) {
                    Platform.runLater(() -> {
                        curr_this.move(2, gamescreen);
                        Block.updateGhostBlock(curr_this, gamescreen);
                        if (curr_this.isCollided()) {
                            gamescreen.getChildren().addAll(curr_this.getChildren());

                            //#########
                            int val = Block.lineRM(gamescreen);
                            killedLines.set(killedLines.get() + val + val);
                            //#########

                            gamescreen.getChildren().remove(curr_this);
                            curr_this = new Block(true);
                            gamescreen.getChildren().addAll(curr_this);

//                            Block.updateGhostBlock(curr_this,gamescreen);
                            if (curr_this.checkIntersection(gamescreen)) {
                                System.out.println("Game Over");
                                System.exit(0);
                            }
                        }
                    });
                    Thread.sleep(250);
                }
            }
        };
    }
}
