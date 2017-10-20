package Game;


import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;



public class Pixel extends Rectangle{
    double col,row;

    public Pixel(double colInit,double rowInit, Color color){
        super(Game.BLOCKSIZE,Game.BLOCKSIZE);
        col=colInit;
        this.relocate(colInit*Game.BLOCKSIZE+Game.BLOCKSIZE,rowInit*Game.BLOCKSIZE);
        this.setFill(color);
    }

    public void move(int newCol,int newRow){
        col=(this.getLayoutX()+newCol*Game.BLOCKSIZE);
        row=(this.getLayoutY()+newRow*Game.BLOCKSIZE);
        this.relocate(col,row);
    }
}
