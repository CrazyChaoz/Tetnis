package Game;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.concurrent.Task;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.stage.StageStyle;


public class Game extends Application {
    public static final int BLOCKSIZE=32;


    public Block curr_this;
    public Block curr_other;
    public Group gamescreen=new Group();
    public IntegerProperty killedLines=new SimpleIntegerProperty(0);

    @Override
    public void start(Stage stage) throws Exception{
        //Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"))
        

        stage.initStyle(StageStyle.TRANSPARENT);

        Pane parent=new Pane();
        //Links und rechts Wand
        Rectangle left=new Rectangle(BLOCKSIZE,BLOCKSIZE*20);
        Rectangle bottom=new Rectangle(BLOCKSIZE*10+BLOCKSIZE*2,BLOCKSIZE);
        Rectangle right=new Rectangle(BLOCKSIZE,BLOCKSIZE*20);
        left.relocate(BLOCKSIZE,0);
        right.relocate(BLOCKSIZE*2+BLOCKSIZE*10,0);
        bottom.relocate(BLOCKSIZE,BLOCKSIZE*20);

        gamescreen.getChildren().addAll(left,right,bottom);

        Task<Void> runner_this = new Task<Void>() {
            @Override
            protected Void call() throws Exception {

                Platform.runLater(()->{
                    curr_this=new Block(stage);
                    Block.updateGhostBlock(curr_this,gamescreen);
                    parent.getChildren().addAll(curr_this);
                });

                while(true){
                    Platform.runLater(()->{
                        curr_this.move(2,gamescreen);
                        Block.updateGhostBlock(curr_this,gamescreen);
                        if(curr_this.isCollided()){
                            gamescreen.getChildren().addAll(curr_this.getChildren());

                            //#########
                            int val=Block.lineRM(gamescreen);
                            killedLines.set(killedLines.get()+val+val);
                            //#########

                            curr_this=new Block(stage);
                            parent.getChildren().remove(1);
                            parent.getChildren().addAll(curr_this);

//                            Block.updateGhostBlock(curr_this,gamescreen);
                            if(curr_this.checkIntersection(gamescreen)){
                                System.out.println("Game Over");
                                System.exit(0);
                            }
                        }
                    });
                    Thread.sleep(250);
                }
            }
        };
        new Thread(runner_this).start();

        parent.getChildren().add(gamescreen);
        Label punkte=new Label("Punkte: 0");
        punkte.relocate(Game.BLOCKSIZE,Game.BLOCKSIZE*21);
        punkte.setStyle("-fx-font-size:1.2em;-fx-font-weight:bold;-fx-background-color: blueviolet");
        Group obergruppe=new Group(parent,punkte);

        Scene scene=new Scene(obergruppe, Game.BLOCKSIZE*10+Game.BLOCKSIZE*4, Game.BLOCKSIZE*22);

        scene.setFill(Color.TRANSPARENT);
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
            switch (key.getCode()){
                case Q:
                    curr_this.move(0,gamescreen);
                    Block.updateGhostBlock(curr_this,gamescreen);
                    break;
                case E:
                    curr_this.move(1,gamescreen);
                    Block.updateGhostBlock(curr_this,gamescreen);
                    break;
                case S:
                    curr_this.move(2,gamescreen);
                    break;
                case A:
                    curr_this.move(3,gamescreen);
                    Block.updateGhostBlock(curr_this,gamescreen);
                    break;
                case D:
                    curr_this.move(4,gamescreen);
                    Block.updateGhostBlock(curr_this,gamescreen);
                    break;
            }
        });
        killedLines.addListener((observable, oldValue, newValue) -> {
            punkte.setText("Punkte: " + killedLines.get());

        });
        
        //#####################
        //#####################
        //Für Cedric        
        //#####################
        //scene.getStylesheets().add(this.getClass().getResource("skin.css").toExternalForm());
        //#####################
        //#####################
        
        stage.setTitle("Tetnis");
        stage.setScene(scene);
        stage.show();
    }


}
