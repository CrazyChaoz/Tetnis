package sample;


import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.beans.binding.BooleanBinding;
import javafx.beans.binding.IntegerBinding;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.layout.TilePane;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.Random;

/**
 * Created by testuser on 01.06.2017.
 */
public class Block extends Pane {
    private int height;
    static final Random rnd=new Random();
    static boolean[][]belegt=new boolean[10][22];

    static IntegerProperty lives=new SimpleIntegerProperty(3);
    static IntegerProperty score=new SimpleIntegerProperty(0);
    static BooleanBinding isGameOver=lives.isEqualTo(0);
    static IntegerBinding level=score.divide(5).add(1);

    public Block(Stage stage,Pane parent) {
        super();
        int i=0;//rnd.nextInt(3);
        switch (i){
            case 0:

                this.getChildren().add(new Pixel(3,0).view);
                this.getChildren().add(new Pixel(4,0).view);
                this.getChildren().add(new Pixel(5,0).view);
                this.getChildren().add(new Pixel(6,0).view);
                height=1;
                stage.show();

                break;
            case 1:
                Main.curr=new Pane();
                Main.curr.getChildren().add(new Pixel(4,0).view);
                Main.curr.getChildren().add(new Pixel(5,0).view);
                Main.curr.getChildren().add(new Pixel(4,1).view);
                stage.setTitle("Hello World");
                stage.setScene(new Scene(Main.curr, Main.blocksize*10, Main.blocksize*22));
                stage.show();
                break;
            case 2:
                Main.curr=new Pane();
                Main.curr.getChildren().add(new Pixel(4,0).view);
                Main.curr.getChildren().add(new Pixel(4,1).view);
                Main.curr.getChildren().add(new Pixel(5,0).view);
                Main.curr.getChildren().add(new Pixel(5,1).view);
                stage.setTitle("Hello World");
                stage.setScene(new Scene(Main.curr, Main.blocksize*10, Main.blocksize*22));
                stage.show();
                break;
            default:
                System.err.println("wrong shape"+i);
                break;

        }


        this.setTranslateY(-Main.blocksize*22);
        double duration=Math.max(1,5-2*rnd.nextDouble());

        Timeline movement=new Timeline();

        KeyFrame target=new KeyFrame(Duration.seconds(duration), event -> {
            //get Pixel coords
            //add pixel coords to array
            parent.getChildren().add(new Block(stage,parent));

        },new KeyValue(this.translateYProperty(),Main.blocksize*(22-height)));

        movement.getKeyFrames().add(target);
        movement.play();

        /*


        double y=Math.max(rnd.nextDouble()*600,this.height);

        this.setTranslateX(800+width);
        this.setTranslateY(y);

        DoubleProperty sinX=new SimpleDoubleProperty();
        double duration=Math.max(3,11-level.get()*rnd.nextDouble());


        Timeline movement=new Timeline();

        KeyFrame target=new KeyFrame(Duration.seconds(duration),event -> {
            //spawn new Block
            Main.curr=new Block(parent);
        },new KeyValue(this.translateXProperty(),-width), new KeyValue(sinX,8*Math.PI));

        sinX.addListener((observable, oldValue, newValue) -> {setTranslateY(Math.sin(sinX.get())*height+y);});

        movement.getKeyFrames().add(target);
        movement.play();

        isGameOver.addListener((observable, oldValue, newValue) -> Block.this.rip(parent, movement));

        this.setOnMousePressed(event -> {
            rip(parent,movement);
        });
        */
    }

    void rip(Group parent, Timeline movement){
        System.err.println("Need impl --> End of game Screen");
        //print msg
    }
}
