#include <iostream>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int sum=0,min=101;
    for(int i=0;i<7;i++){
        int a;
        cin >> a;
        if(a%2==1){
            sum+=a;
            if(a<min) min=a;
        }
    }
    if(sum!=0){
        cout << sum << "\n" << min;
    }else{
        cout <<-1;
    }
    return 0;
}