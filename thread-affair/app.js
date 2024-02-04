const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';
const ADD_TO_WISHLIST_EVENT = 'wl/productAdded';
const REMOVE_FROM_WISHLIST_EVENT = 'wl/productRemoved';

const AddToCartButton = ({ productId }) => {
  const state = React.useState({
    added: false,
    busy: false,
  });
  const actualState = state[0];
  const setState = state[1];
  const { added, busy } = actualState;

  const onClick = () => {
    // set state as busy before request
    setState({
      ...actualState,
      busy: true,
    });

    // simulate request
    setTimeout(() => {
      const eventName =
        added === true ? REMOVE_FROM_CART_EVENT : ADD_TO_CART_EVENT;

      dispatchEvent(
        new CustomEvent(eventName, {
          detail: {
            productId,
          },
        }),
      );

      // mark state as done
      setState({
        ...actualState,
        added: !actualState.added,
      });
    }, Math.floor(Math.random() * 3000));
  };

  return (
    <button
      className={`product-control ${added ? 'active' : ''}`}
      type="button"
      title={added === true ? 'Remove from Cart' : 'Add to Cart'}
      onClick={onClick}
      disabled={busy}
    >
      {added === true ? `PID: ${productId} in cart` : 'Add to Cart'}
      {busy === true ? <i className="fas fa-spinner"></i> : null}
    </button>
  );
};

const AddToWishlistButton = ({ productId }) => {
  // nested destructure
  const [{ added, busy }, setState] = React.useState({
    added: false,
    busy: false,
  });
  const onClick = () => {
    setState({
      busy: true,
    });

    setTimeout(() => {
      const eventName =
        added === true ? REMOVE_FROM_WISHLIST_EVENT : ADD_TO_WISHLIST_EVENT;

      dispatchEvent(
        new CustomEvent(eventName, {
          detail: {
            productId,
          },
        }),
      );

      setState({
        added: !added,
        busy: false,
      });
    }, Math.floor(Math.random() * (1000 * 3)));
  };

  return (
    <button
      className={`product-control ${added ? 'active' : ''}`}
      type="button"
      title={added === true ? 'Remove from Wishlist' : 'Add to Wishlist'}
      onClick={onClick}
      disabled={busy}
    >
      {added === true ? `PID: ${productId} in wl` : 'Add to Wishlist'}
      {busy === true ? <i className="fas fa-spinner"></i> : null}
    </button>
  );
};

const ProductControls = (props) => {
  const { productId } = props;

  return [
    <AddToCartButton productId={productId} key={0}></AddToCartButton>,
    <AddToWishlistButton productId={productId} key={1}></AddToWishlistButton>,
  ];
};

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  const root = ReactDOM.createRoot(productTileControl);

  root.render(<ProductControls productId={index}></ProductControls>);
});

const HeaderCartCounter = () => {
  const state = React.useState({
    productIds: [],
    qty: 0,
  });
  const actualState = state[0];
  const setState = state[1];

  React.useEffect(() => {
    const handler = ({ detail }) => {
      const { productId } = detail;

      setState((previousState) => {
        return {
          productIds: [...previousState.productIds, productId],
          qty: previousState.qty + 1,
        };
      });
    };

    addEventListener(ADD_TO_CART_EVENT, handler);

    return () => {
      removeEventListener(ADD_TO_CART_EVENT, handler);
    };
  }, []);

  React.useEffect(() => {
    const handler = ({ detail }) => {
      setState((previousState) => {
        return {
          productIds: previousState.productIds.filter((productId) => {
            return productId !== detail.productId;
          }),
          qty: previousState.qty - 1,
        };
      });
    };

    addEventListener(REMOVE_FROM_CART_EVENT, handler);

    return () => {
      removeEventListener(REMOVE_FROM_CART_EVENT, handler);
    };
  }, []);

  const showProducts = () => {
    let message = '';
    if (actualState.qty <= 0) {
      message = 'There are no products in your cart.';
    } else {
      message = `These are the pids in your cart: ${actualState.productIds}`;
    }

    alert(message);
  };

  return (
    <div className="header-counter" onClick={showProducts}>
      <span className="cart-qty">{actualState.qty}</span>
      <i className="fas fa-shopping-cart icon"></i>
    </div>
  );
};

const HeaderWlCounter = () => {
  // nested destructure
  const [{ productIds, qty }, setState] = React.useState({
    productIds: [],
    qty: 0,
  });

  React.useEffect(() => {
    const handler = ({ detail }) => {
      const { productId } = detail;

      setState(({ productIds, qty }) => {
        return {
          productIds: [...productIds, productId],
          qty: ++qty,
        };
      });
    };
    addEventListener(ADD_TO_WISHLIST_EVENT, handler);

    return () => {
      removeEventListener(ADD_TO_WISHLIST_EVENT, handler);
    };
  }, []);

  React.useEffect(() => {
    const handler = ({ detail }) => {
      setState(({ productIds, qty }) => {
        return {
          productIds: productIds.filter((productId) => {
            return productId !== detail.productId;
          }),
          qty: --qty,
        };
      });
    };
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, handler);

    return () => {
      removeEventListener(REMOVE_FROM_WISHLIST_EVENT, handler);
    };
  }, []);

  const showProducts = () => {
    const message =
      qty <= 0
        ? 'There are no product in your wishlist.'
        : `There are the pids in your wishlist: ${productIds}`;

    alert(message);
  };

  return (
    <div className="header-counter" onClick={showProducts}>
      <span className="cart-qty">{qty}</span>
      <i className="fas fa-heart icon"></i>
    </div>
  );
};

const HeaderCounters = () => {
  const [showButtons, setsShowButtons] = React.useState(true);
  const toggleCounters = () => {
    setsShowButtons(!showButtons);
  };

  return (
    <>
      <button title="Toggle" type="button" onClick={toggleCounters}>
        Toggle
      </button>

      {showButtons ? (
        <>
          <HeaderCartCounter></HeaderCartCounter>
          <HeaderWlCounter></HeaderWlCounter>
        </>
      ) : null}
    </>
  );
};

const headerCounters = document.querySelector('.header-counters');
ReactDOM.createRoot(headerCounters).render(<HeaderCounters></HeaderCounters>);

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

// newsletter form
const NewsletterForm = () => {
  const [state, setState] = React.useState({
    email: '',
    formMessage: '',
    busy: false,
    successMessage: '',
  });
  const { email, formMessage, busy, successMessage } = state;

  // controlled input
  const onChange = (event) => {
    // just target recommended
    setState({
      ...state,
      email: event.target.value,
      formMessage: '',
    });
  };

  const send = (event) => {
    event.preventDefault();
    // event.target['field-newsletter'].value

    if (busy) {
      return;
    }

    if (!validateEmail(email)) {
      setState({
        ...state,
        formMessage: 'Please use a valid email',
      });

      return;
    }

    setState({
      ...state,
      busy: true,
      formMessage: '',
    });

    // simulate ajax
    setTimeout(() => {
      setState({
        ...state,
        busy: false,
        email: '',
        successMessage: `Emailul ${email} a fost inscris.`,
      });

      //callback hell
      setTimeout(() => {
        setState({
          ...state,
          email: '',
          successMessage: '',
        });
      }, 1200);
    }, 1200);
  };

  if (successMessage.length > 0) {
    return <div className="container">{successMessage}</div>;
  }

  return (
    <form className="form-newsletter container" onSubmit={send}>
      <label htmlFor="field-newsletter">
        Subscribe to our <span>newsletter</span>
      </label>

      <input
        type="text"
        name="field-newsletter"
        id="field-newsletter"
        placeholder="enter your email address to receive the latest news!"
        value={email}
        onChange={onChange}
      ></input>

      <button title="Subscribe" type="submit" disabled={busy}>
        {busy ? '...loading' : 'Subscribe'}
      </button>

      <div className="form-message">{formMessage}</div>
    </form>
  );
};

ReactDOM.createRoot(document.querySelector('section.home-newsletter')).render(
  <NewsletterForm></NewsletterForm>,
);
