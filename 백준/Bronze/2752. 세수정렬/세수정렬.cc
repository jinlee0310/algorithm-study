#include <iostream>

using namespace std;

int main(){
    int A,B,C;
    cin >> A >> B >> C;

    int arr[3];
    if(A>B&&A>C){
        arr[0]=A;
        if(B>C){
            arr[1]=B;
            arr[2]=C;
        }
        else{
            arr[1]=C;
            arr[2]=B;
        }
    }else if(B>C&&B>A){
        arr[0]=B;
        if(A>C){
            arr[1]=A;
            arr[2]=C;
        }
        else{
            arr[1]=C;
            arr[2]=A;
        }
    }else{
        arr[0]=C;
        if(A>B){
            arr[1]=A;
            arr[2]=B;
        }else{
            arr[1]=B;
            arr[2]=A;
        }

    }

    for(int i=2;i>=0;i--){
       cout << arr[i] << " ";
    }
    return 0;
}