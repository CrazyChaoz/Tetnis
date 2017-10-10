package Game;


import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;



public class Pixel extends Rectangle{
    int col;

    public Pixel(int colInit,int rowInit, Color color){
        super(Game.BLOCKSIZE,Game.BLOCKSIZE);
        col=colInit;

        this.setFill(color);
        this.relocate(colInit*Game.BLOCKSIZE+Game.BLOCKSIZE,rowInit*Game.BLOCKSIZE);
    }

    public void move(int newCol,int newRow){
        this.relocate(this.getLayoutX()+newCol*Game.BLOCKSIZE,this.getLayoutY()+newRow*Game.BLOCKSIZE);
    }
}
