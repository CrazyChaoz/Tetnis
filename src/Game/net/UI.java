package Game.net;

import Game.Block;
import Game.Game;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.concurrent.Task;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.util.Scanner;

import static Game.net.Worker.*;

public class UI extends Application{
    public static final int BLOCKSIZE=32;





    public static void main(String[] args) {
        Application.launch(args);
    }
    @Override
    public void start(Stage stage) throws Exception {

//        System.out.print("Username: ");
//        Worker.userName=new Scanner(System.in).next();
//        System.out.println("Client/Server[c/s]:");
//        switch (new Scanner(System.in).next()){
//            case "c":
//                Worker.startClient();
//                break;
//            case "s":
//                Worker.startServer();
//                break;
//        }



        //Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"))

        stage.initStyle(StageStyle.TRANSPARENT);

        Pane parent = new Pane();
        //Links und rechts Wand
        Rectangle left = new Rectangle(BLOCKSIZE, BLOCKSIZE * 20);
        Rectangle bottom = new Rectangle(BLOCKSIZE * 10 + BLOCKSIZE * 2, BLOCKSIZE);
        Rectangle right = new Rectangle(BLOCKSIZE, BLOCKSIZE * 20);
        left.relocate(BLOCKSIZE, 0);
        right.relocate(BLOCKSIZE * 2 + BLOCKSIZE * 10, 0);
        bottom.relocate(BLOCKSIZE, BLOCKSIZE * 20);

        Rectangle other_left = new Rectangle(BLOCKSIZE, BLOCKSIZE * 20);
        Rectangle other_bottom = new Rectangle(BLOCKSIZE * 10 + BLOCKSIZE * 2, BLOCKSIZE);
        Rectangle other_right = new Rectangle(BLOCKSIZE, BLOCKSIZE * 20);
        other_left.relocate(BLOCKSIZE*14, 0);
        other_right.relocate(BLOCKSIZE * 2 + BLOCKSIZE * 23, 0);
        other_bottom.relocate(BLOCKSIZE*14, BLOCKSIZE * 20);

        gamescreen.getChildren().addAll(left, right, bottom,other_bottom,other_left,other_right);


        new Thread(Worker.getLocalGame()).start();
        new Thread(Worker.getOtherGame()).start();


//        parent.getChildren().add(gamescreen);
        Label punkte = new Label("Punkte: 0");
        punkte.relocate(Game.BLOCKSIZE, Game.BLOCKSIZE * 21);
        punkte.setStyle("-fx-font-size:1.2em;-fx-font-weight:bold;-fx-background-color: blueviolet");
        Group obergruppe = new Group(gamescreen, punkte);

        Scene scene = new Scene(obergruppe, Game.BLOCKSIZE * 23 + Game.BLOCKSIZE * 4, Game.BLOCKSIZE * 22);

        scene.setFill(Color.TRANSPARENT);
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
            switch (key.getCode()) {
                case Q:
                    curr_this.move(0, gamescreen);
                    Block.updateGhostBlock(curr_this, gamescreen);
                    break;
                case E:
                    curr_this.move(1, gamescreen);
                    Block.updateGhostBlock(curr_this, gamescreen);
                    break;
                case S:
                    curr_this.move(2, gamescreen);
                    break;
                case A:
                    curr_this.move(3, gamescreen);
                    Block.updateGhostBlock(curr_this, gamescreen);
                    break;
                case D:
                    curr_this.move(4, gamescreen);
                    Block.updateGhostBlock(curr_this, gamescreen);
                    break;
                case F:
                    while(curr_this.move(2, gamescreen));
                    break;
            }
        });
        killedLines.addListener((observable, oldValue, newValue) -> {
            punkte.setText("Punkte: " + killedLines.get());

        });

        stage.setTitle("Tetnis");
        stage.setScene(scene);
        stage.show();
    }

}

