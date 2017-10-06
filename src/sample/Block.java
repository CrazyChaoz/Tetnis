package sample;


import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.beans.binding.BooleanBinding;
import javafx.beans.binding.IntegerBinding;
import javafx.beans.property.DoubleProperty;
import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.paint.Color;
import javafx.scene.shape.*;
import javafx.util.Duration;

import java.util.Random;

/**
 * Created by testuser on 01.06.2017.
 */
public class Block extends Parent {
    static final Random rnd=new Random();

    static int height=50;
    static int width=50;
    static int headRad=5;
    static IntegerProperty lives=new SimpleIntegerProperty(3);
    static IntegerProperty score=new SimpleIntegerProperty(0);
    static BooleanBinding isGameOver=lives.isEqualTo(0);
    static IntegerBinding level=score.divide(5).add(1);

    public Block(Group parent) {
        Shape cockpit = new Ellipse(width / 4, height / 2);
        cockpit=Shape.subtract(cockpit,new Rectangle(-width / 4, 0,width / 2, height / 2));
        cockpit.setFill(Color.LIGHTBLUE);
        cockpit.setStroke(Color.WHITE);
        getChildren().add(cockpit);

        Shape huelle=new Ellipse(width / 2, height / 6);
        huelle.setFill(Color.PINK);
        getChildren().add(huelle);

        Shape head=new Circle(0,-height/6-headRad,headRad);
        head.setFill(Color.GREEN);
        getChildren().add(head);

        Shape ant1=new Line(0,-height/6-headRad,-1.2*headRad,-height/6-headRad-1.2*headRad);
        ant1.setStroke(Color.GREEN);
        getChildren().add(ant1);

        Shape ant2=new Line(0,-height/6-headRad,1.2*headRad,-height/6-headRad-1.2*headRad);
        ant2.setStroke(Color.GREEN);
        getChildren().add(ant2);

        Shape eye=new Ellipse(0,-height/6-headRad-1.5,1.5,1);
        eye.setStroke(Color.WHITE);
        eye.setFill(Color.RED);
        getChildren().add(eye);

        double y=Math.max(rnd.nextDouble()*600,this.height);

        this.setTranslateX(800+width);
        this.setTranslateY(y);

        DoubleProperty sinX=new SimpleDoubleProperty();
        double duration=Math.max(3,11-level.get()*rnd.nextDouble());


        Timeline movement=new Timeline();

        KeyFrame target=new KeyFrame(Duration.seconds(duration),event -> {
            //spawn new Block
            Block.lives.set(Block.lives.get()-1);
            parent.getChildren().remove(this);
        },new KeyValue(this.translateXProperty(),-width), new KeyValue(sinX,8*Math.PI));
        sinX.addListener((observable, oldValue, newValue) -> {
            setTranslateY(Math.sin(sinX.get())*height+y);
        });
        movement.getKeyFrames().add(target);
        movement.play();

        isGameOver.addListener((observable, oldValue, newValue) -> Block.this.rip(parent, movement));

        this.setOnMousePressed(event -> {
            rip(parent,movement);
        });
    }

    void rip(Group parent, Timeline movement){
        System.err.println("Need impl --> End of game Screen");
        //print msg
    }
}
