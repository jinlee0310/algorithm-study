#include <iostream>
#include <stack>

using namespace std;

int main()
{
    int K;
    cin >> K;

    stack <int> s;
    for(int i=0;i<K;i++){
        int n;
        cin >> n;
        if(n==0){
            s.pop();
        }else{
            s.push(n);
        }
    }

    int sum=0;
    while(s.size()){
        sum+=s.top();
        s.pop();
    }

    cout << sum;
    return 0;
}